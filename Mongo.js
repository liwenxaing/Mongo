/**
 * 基于Promise和单例设计模式封装的一个mongodb DB库
 * 优化了链接数据库的时间
 * Author  LiWenxiang
 * 2019-2-2
 */

const mongoClient = require("mongodb").MongoClient;
const config = require("./dbconfig.json");

class Mongo {

    // 外部暴露方法 获取到类实例
    static getInit() {
        if (!Mongo.init) {
            Mongo.init = new Mongo();
        }
        return Mongo.init;
    }

    /**
     * 返回数据 公用
     * @param resolve
     * @param reject
     * @param errData
     * @param sucessData
     */
    isReturnData(resolve, reject, errData, sucessData) {
        if (errData) {
            reject(errData);
            return;
        }
        resolve(sucessData);
    }

    /**
     * 构造器 初始化链接
     */
    constructor() {
        this.isClient = null; // 判断是否已经连接了数据库
        this.connect();
    }

    /**
     * 数据库连接方法
     * @returns {Promise<any>}
     */
    connect() {
        return new Promise((resolve, reject) => {
            if (!this.isClient) {
                mongoClient.connect(config.dbUrl, (err, client) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.isClient = client.db(config.dbName);
                    resolve(this.isClient);
                });
            } else {
                return this.isClient;
            }
        })
    }

    /**
     * 查找方法
     * @param collectionName   集合名称
     * @param queryJson    查询对象
     * @returns {Promise<any>}
     */
    find(collectionName, queryJson = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let res = db.collection(collectionName).find(queryJson);
                res.toArray((err, docs) => {
                    this.isReturnData(resolve, reject, err, docs)
                });
            });
        })
    }

    /**
     * @param collectionName
     * @param queryJson
     * @param updatedJson
     * @returns {Promise<any>}
     */
    update(collectionName, queryJson, updatedJson) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let res = db.collection(collectionName).update(queryJson, {$set: updatedJson}, (err, result) => {
                    this.isReturnData(resolve, reject, err, result)
                });
            });
        })
    }

    /**
     *
     * @param collectionName
     * @param queryJson
     * @returns {Promise<any>}
     */
    remove(collectionName, queryJson) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let res = db.collection(collectionName).removeOne(queryJson, (err, result) => {
                    this.isReturnData(resolve, reject, err, result)
                });
            });
        })
    }

    /**
     * @param collectionName
     * @param json
     * @param limit
     * @param skip
     * @returns {Promise<any>}
     */
    limit(collectionName,limit,skip=0,json={}){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let res = db.collection(collectionName).find(json).skip(skip).limit(limit);
                res.toArray((err, docs) => {
                    this.isReturnData(resolve, reject, err, docs);
                });
            });
        })
    }

    /**
     * @param collectionName
     * @param json
     * @returns {Promise<any>}
     */
    count(collectionName,json={}){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                let res = db.collection(collectionName).find(json);
                res.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs.length);
                });
            })
        });
    }

    /**
     * @param collectionName
     * @param key
     * @param regex
     * @returns {Promise<any>}
     */
    like(collectionName,key,regex){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                let queryObj = {};
                queryObj[key] = {$regex:regex};
                let res = db.collection(collectionName).find(queryObj);
                res.toArray((err, docs) => {
                    this.isReturnData(resolve, reject, err, docs);
                });
            })
        });
    }

    /**
     * @param collectionName
     * @param key
     * @param regex
     * @param limit
     * @param skip
     * @returns {Promise<any>}
     */
    likeLimit(collectionName,key,regex,limit,skip=0){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                let queryObj = {};
                queryObj[key] = {$regex:regex};
                let res = db.collection(collectionName).find(queryObj).skip(skip).limit(limit);
                res.toArray((err, docs) => {
                    docs[docs.length] = docs.length;
                    this.isReturnData(resolve, reject, err, docs);
                });
            });
        });
    }

    add(collectionName,json){
        return new Promise((resolve,reject)=>{
             this.connect().then(db=>{
                 db.collection(collectionName).insertOne(json,(err,result)=>{
                     if(err){
                         reject(err);
                         return;
                     }
                     resolve(result);
                 });
             });
        });
    }

}

module.exports = Mongo.getInit();
