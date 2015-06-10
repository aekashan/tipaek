if exists (SELECT * FROM tempdb.dbo.sysobjects AS t WHERE t.name LIKE '#%tmp0%' AND t.id = OBJECT_ID('tempdb..' + SUBSTRING(t.name, 1, CHARINDEX('___', t.name)-1)) )
                                begin 
	                                drop table #tmp0
                                end 