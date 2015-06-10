select pid,name,lastname,brand,model,yearCar,noregister,carProvince,tiscoBranch 
into #tmp1
from car_loan


select COLUMN_NAME ,DATA_TYPE , character_maximum_length
from tempdb.INFORMATION_SCHEMA.COLUMNS
where table_name like '#tmp1%' 


declare @loan varchar(50)
set  @loan = 'objADDRESS'
select 

xx = 'public ' + case when DaTa_Type IN('varchar','char') then 'string' 
					  when DaTa_Type IN('datetime') then 'DateTime?' 
					  when DaTa_Type IN('nvarchar') then 'string' 
					  when DaTa_Type IN('money') then 'decimal?' 
					  when DaTa_Type IN('real') then 'string' 
					  when DaTa_Type IN('int') then 'int?' 
					  when DaTa_Type IN('numeric') then 'int?'
					  else  DaTa_Type 
				end  
				+' ' +Column_name + ' ' +'{'+' ' +'get;'+' set; }'
,xx1 = ','+Column_name + ':'+Column_name
,xx1 = ','+Column_name + ':null'
,xx2 = 'connector.AddParameter('+ convert(varchar(50), ROW_NUMBER() OVER(ORDER BY ORDINAL_POSITION )-1)+',"'+'@'+ Column_name+'",'+@loan+'.'+Column_name+');'
,x3 = ','+Column_name 
,x4 = ',@'+Column_name 
,xx5 = @loan+'.'+Column_name
,xx6 = ','+Column_name + '=@' +Column_name
,xx7 =  'var '+Column_name + '= null' 

 from tempdb.INFORMATION_SCHEMA.COLUMNS
where table_name like '#tmp1%' 



