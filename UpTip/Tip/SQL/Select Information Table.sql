

select COLUMN_NAME ,DATA_TYPE , character_maximum_length
from INFORMATION_SCHEMA.COLUMNS
where table_name like 'TableTest' 

