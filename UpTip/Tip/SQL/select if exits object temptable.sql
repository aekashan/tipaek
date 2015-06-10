SELECT
*
FROM tempdb.dbo.sysobjects AS t
WHERE t.name LIKE '#%test1%'
AND t.id =
  OBJECT_ID('tempdb..' + SUBSTRING(t.name, 1, CHARINDEX('___', t.name)-1)) 