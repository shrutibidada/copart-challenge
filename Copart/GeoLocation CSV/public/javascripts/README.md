Please do the following before executing the code:

npm install fast-csv
npm install mysql
npm install geocoder

The table is created in command line(not using nodejs):
so please execute following to create table:

create table vehicle( url varchar(255), lotno varchar(20), retValue varchar(20), year varchar(20), make varchar(255), model varchar(255), sale varchar(255), engType varchar(255), state varchar(20), ownerDoc varchar(255), odoDesc varchar(255), cylinder varchar(10), vin varchar(255), grid varchar(255), odoRead varchar(20), damage varchar(255), curBid varchar(25), myBid varchar(25), itemNo varchar(20), location varchar(255), salesStat varchar(255), repair varchar(25), lat varchar(255), longitude varchar(255));


run the code :
node nodejs

PS: the google API might not result any latitude or longitude if the number of usage exceeds limit.
Please modify the API key in that case
