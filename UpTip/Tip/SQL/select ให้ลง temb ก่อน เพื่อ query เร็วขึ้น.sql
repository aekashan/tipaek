declare @createdate datetime

                                select  @createdate = max(createdate) from qatransaction where systemid = @systemid

                                select * into #tmp1 from DataScoreComment

                                select Top @Toprow a.TransactionID,a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID
                                    from qatransaction a
                                    INNER JOIN QADepartment b ON a.DepartmentID = b.DepartmentID
                                    inner join qatransactionlist c on a.TransactionID = c.TransactionID
                                    where 
                                            a.EnableFlag = 'Y' --ต้องเป็นไฟล์ที่เปิดใช้งาน
                                            and a.SupDepartment != 'Database'
		                                    and a.systemid = @systemid
		                                    and b.EnableFlag = 'Y' --ต้องเป็นแผนกที่เปิดใช้งาน
		                                    and a.createdate in (@createdate)
		                                    and a.Transactionid not in  (
								                                    select Transactionid 
								                                    from #tmp1 
								                                    where TransactionCreatedate in (@createdate)
									                                    )--ต้องไม่ใช่ข้อมูลที่ประเมินไปแล้ว
		                                    and a.Transactionid not in (
								                                    select distinct us.TransactionID 
								                                    from QATransactionUser us join qatransaction ts on us.TransactionID = ts.TransactionID
								                                    where  ts.createdate in (@createdate)
									                                    @WhereClause
								                                    ) --ต้องไม่ใช่ข้อมูลที่แจกไปแล้วของรอบนี้และของวันนี้
                                    group by a.TransactionID,a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID	
                                    order by a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID	