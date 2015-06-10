declare @createdate datetime

                                select  @createdate = max(createdate) from qatransaction where systemid = @systemid

                                select * into #tmp1 from DataScoreComment

                                select Top @Toprow a.TransactionID,a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID
                                    from qatransaction a
                                    INNER JOIN QADepartment b ON a.DepartmentID = b.DepartmentID
                                    inner join qatransactionlist c on a.TransactionID = c.TransactionID
                                    where 
                                            a.EnableFlag = 'Y' --��ͧ��������Դ��ҹ
                                            and a.SupDepartment != 'Database'
		                                    and a.systemid = @systemid
		                                    and b.EnableFlag = 'Y' --��ͧ��Ἱ�����Դ��ҹ
		                                    and a.createdate in (@createdate)
		                                    and a.Transactionid not in  (
								                                    select Transactionid 
								                                    from #tmp1 
								                                    where TransactionCreatedate in (@createdate)
									                                    )--��ͧ���������ŷ������Թ�����
		                                    and a.Transactionid not in (
								                                    select distinct us.TransactionID 
								                                    from QATransactionUser us join qatransaction ts on us.TransactionID = ts.TransactionID
								                                    where  ts.createdate in (@createdate)
									                                    @WhereClause
								                                    ) --��ͧ���������ŷ��ᨡ����Ǣͧ�ͺ�����Тͧ�ѹ���
                                    group by a.TransactionID,a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID	
                                    order by a.SystemID,a.DepartmentID,c.ListID,a.AgeWork,a.AgentID	