import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "ReactNativeSQLite1.db"; //NOME DO BANCO DE DADOS
const database_version = "1.0"; //VERSÃO DO BANCO DE DADOS
const database_displayname = "SQLite React Native Offline Database"; //NOME DE EXIBIÇÃO DO BANCO DE DADOS
const database_size = 20000; //TAMANHO MÁXIMO DO BANCO DE DAD0S

export default class ItemDatabase{
    Conectar(){
        let db;
        return new Promise((resolve)=>{
            console.log("Checando a integridade do plugin...");
            SQLite.echoTest().then(()=>{
                console.log("Integridade Ok...");
                console.log("Abrindo Banco de Dados...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB=>{
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Item LIMIT 1').then(()=>{
                        console.log("O banco de dados está pronto...Executando Consulta SQL...");
                    }).catch((error)=>{
                        console.log("Erro recebido", error);
                        console.log("O Banco de dados não está pronto...Criando Tabela");
                        db.transaction((tx)=>{
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Item(id INTEGER PRIMARY KEY, descricao varchar(30), data INTEGER, prioridades varchar(30), status varchar(30))');
                        }).then(()=>{
                            console.log("Tabela criada com sucessso");
                        }).catch(error=>{
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error=>{
                    console.log(error);
                });
            }).catch(error=>{
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    };

    Desconectar(db){
        if(db){
            console.log("Fechando Banco de Dados");
            db.close().then(status=>{
                console.log("Banco de dados Desconectado!!");
            }).catch(error=>{
                this.errorCB(error);
            });
        }else{
            console.log("A conexão com o banco não está aberta");
        };
    };

    Listar(){
        return new Promise((resolve)=>{
            const lista =[];
            this.Conectar().then((db)=>{
                db.transaction((tx)=>{
                    tx.executeSql('SELECT*FROM Item', []).then (([tx, results])=>{
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for(let i = 0; i < len; i++){
                            let row = results.rows.item(i);
                            const{id, descricao, data, prioridades, status} = row;
                            lista.push({id, descricao, data, prioridades, status});
                        };
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((results)=>{
                    this.Desconectar(db);
                }).catch((err)=>{
                    console.log(err);
                });
            }).catch((err)=>{
                console.log(err);
            });
        });
    }

    Inserir(item){
        return new Promise((resolve)=>{
            this.Conectar().then((db)=>{
                db.transaction((tx)=>{
                    console.log("Comando INSERT");
                    tx.executeSql('INSERT INTO Item (descricao, data, prioridades, status) VALUES (?,?,?,?)', [item.descricao, item.data, item.prioridades, item.status]).then(([tx, results])=>{
                        resolve(results);
                    });
                }).then((result)=>{
                    this.Desconectar(db);
                }).catch((err)=>{
                    console.log(err);
                });
            }).catch((err)=>{
                console.log(err);
            });
        });
    };

    Atualizar(id, status){
        return new Promise((resolve)=>{
            this.Conectar().then((db)=>{
                this.transaction((tx)=>{
                    tx.executeSql('UPDATE Item SET status = ? WHERE id = ?', [item.status, item.id]).then(([tx, results])=>{
                        resolve(results);
                    });
                    }).then((result)=>{
                        this.Desconectar(db);
                    }).catch((err)=>{
                        console.log(err);
                    });
                }).catch((err)=>{
                    console.log(err);
                });
            });
        }

        Excluir(id){
            return new Promise((resolve)=>{
                this.Conectar().then((db)=>{
                    db.transaction((tx)=>{
                        tx.executeSql('DELETE FROM Item WHERE Id = ?', [id]).then(([tx, results])=>{
                            console.log(results);
                            resolve(results);
                        });
                    }).then((result)=>{
                        this.Desconectar(db);
                    }).catch((err)=>{
                        console((err)=>{
                    });
                    }).catch((err)=>{
                        console.log(err);
                    });
                });
            });
        }
}