import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export interface IhymnsSpanishOne {
    id: number;
    title: string;
    author: string;
    based_on: string;
    track_url: string;
    song_url: string;
    web_url: string;
    lyrics: string;
    favorite: boolean;
    openAt: number;
}

@Injectable()
export class ShymnsSpanishOne {
    private tables = { en: 'hymns_english', es: 'hymns_spanish_one', de: 'hymns_deutsch' };
    hymnsSpanishOne: IhymnsSpanishOne[] = [];
    constructor(private storage: SQLite) { }

    getAll(lang: string, fav?: boolean, cant?: number, filter?: string): Promise<IhymnsSpanishOne[] | any> {
        return new Promise((resolve, reject) => {
            this.storage = new SQLite();
            this.storage.create({ name: 'hymnalbooks.db', location: 'default' }).then(db => {
                let sql = `SELECT * FROM ${this.tables[lang]}` + (fav ? ' WHERE favorite = 1 ' : '') + ` ORDER BY "_id" ASC LIMIT  ${cant},30`;
                if (filter) {
                    sql = `SELECT * FROM ${this.tables[lang]}` + ` WHERE (LOWER(title) LIKE LOWER('%${filter}%') OR _id = '${filter}') ` + (fav ? ' AND favorite = 1 ' : '') + ` ORDER BY "_id" ASC LIMIT  ${cant},30`;
                }
                console.log(sql)
                db.executeSql(sql, [])
                    .then((data) => {
                        let hymns: IhymnsSpanishOne[] = [];
                        if (data.rows.length) {
                            for (let i = 0, items = data.rows, cant = data.rows.length; i < cant; i++) {
                                hymns.push({
                                    id: items.item(i)._id,
                                    title: items.item(i).title,
                                    author: items.item(i).author,
                                    based_on: items.item(i).based_on,
                                    track_url: items.item(i).track_url,
                                    song_url: items.item(i).song_url,
                                    web_url: items.item(i).web_url,
                                    lyrics: items.item(i).lyrics,
                                    favorite: items.item(i).favorite === 1,
                                    openAt: items.item(i).openAt,
                                });
                            }
                        }
                        resolve(hymns);
                    }).catch((error) => { console.log("then", JSON.stringify(error)); reject(error); });
            })
        });
    }

    toggleFavorite(hymn: IhymnsSpanishOne, lang: string): Promise<IhymnsSpanishOne[] | any> {
        hymn.favorite = !hymn.favorite;
        return new Promise((resolve, reject) => {
            this.storage = new SQLite();
            this.storage.create({ name: 'hymnalbooks.db', location: 'default' }).then(db => {
                db.executeSql('UPDATE ' + this.tables[lang] + ' SET favorite = ? WHERE "_id" = ?', [(hymn.favorite ? 1 : 0), hymn.id])
                    .then((data) => {
                        resolve(hymn);
                    }, (error) => { reject(error); })
                    .catch(error => { reject(error); });
            })
        });
    }

    setOpenAt(hymn: IhymnsSpanishOne, lang: string): Promise<IhymnsSpanishOne[] | any> {
        return new Promise((resolve, reject) => {
            this.storage = new SQLite();
            this.storage.create({ name: 'hymnalbooks.db', location: 'default' }).then(db => {
                db.executeSql('UPDATE ' + this.tables[lang] + ' SET openAt = ? WHERE "_id" = ?', [new Date(), hymn.id])
                    .then((data) => {
                        resolve(hymn);
                    }, (error) => { reject(error); })
                    .catch(error => { reject(error); });
            })
        });
    }

    getLast10(lang: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.storage = new SQLite();
            this.storage.create({ name: 'hymnalbooks.db', location: 'default' }).then(db => {
                db.executeSql('SELECT * FROM ' + this.tables[lang] + ' WHERE openAt <> 0 ORDER BY openAt DESC LIMIT 0,10', [])
                    .then((data) => {
                        let hymns: IhymnsSpanishOne[] = [];
                        if (data.rows.length) {
                            for (let i = 0, items = data.rows, cant = data.rows.length; i < cant; i++) {
                                hymns.push({
                                    id: items.item(i)._id,
                                    title: items.item(i).title,
                                    author: items.item(i).author,
                                    based_on: items.item(i).based_on,
                                    track_url: items.item(i).track_url,
                                    song_url: items.item(i).song_url,
                                    web_url: items.item(i).web_url,
                                    lyrics: items.item(i).lyrics,
                                    favorite: items.item(i).favorite === 1,
                                    openAt: items.item(i).openAt,
                                });
                            }
                        }
                        resolve(hymns);
                    }, (error) => { reject(error); })
                    .catch(error => { reject(error); });
            })
        });
    }
}