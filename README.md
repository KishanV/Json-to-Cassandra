### Json-to-Cassandra

Simple useful tool for Cassandra Database.
It is create tables from JSON specification that is predefined with simple JSON based rules.
It is written using NodeJs and NPM ecosystem.

### JSON specification sample. (Src Code). 
◈ [Database.JSON](https://github.com/KishanV/Json-to-Cassandra/blob/master/database.json)</br>

### Logic & Scripts (Src Code). 
◈ [Db.JS](https://github.com/KishanV/Json-to-Cassandra/blob/master/db.js) Main app entry file.</br>
◈ [Package.JSON](https://github.com/KishanV/Json-to-Cassandra/blob/master/package.json)</br>

### Example :

```json
{
  "PrefixOne_": {
    "Customers": {
             "fields": {
               "Id": { "sample": "1", "type": "int" },
               "CustomerName": { "sample": "132", "type": "text" },
               "Customers": { "sample": "D14C", "type": "text" }
             },
             "primaryKey": ["Id"]
    },
    "Amount": {
           "fields": {
             "Id": { "sample": "1", "type": "int(6)" },
             "Date": { "sample": "132", "type": "int(10)" },
             "Name": { "sample": "132", "type": "int(20)" },
             "Department": { "sample": "132", "type": "text" },
             "Rs": { "sample": "D14C", "type": "text" }
           },
           "primaryKey": ["Id","Name"]
    }
  },
  "PrefixTwo_": {
    "Bills": {
           "fields": {
             "Id": { "sample": "1", "type": "int(6)" },
             "DepartmentId": { "sample": "132", "type": "int(10)" },
             "Party_id": { "sample": "132", "type": "int(20)" },
             "Jangad_no": { "sample": "Abc", "type": "text" },
             "Remark": { "sample": "Note Abc...", "type": "text" }
           },
           "primaryKey": ["Id","Name"]
    }
  }
}
```
