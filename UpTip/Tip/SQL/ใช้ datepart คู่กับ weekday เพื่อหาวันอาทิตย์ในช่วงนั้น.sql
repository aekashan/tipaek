declare @EndDate varchar(50)
                        set @EndDate =  (getdate()+1)

                        SELECT 
								convert(varchar(50),tid ) as tid
                               ,(
								select 
									   Convert(varchar(10),  
                                                        (100 * วันที่โทร)/(วันที่สมัครถึงปัจจุบัน - (วันอาทิตย์  + วันหยุดนักขัตฤกษ์))
                                                        ) + '%'
								--,*
									from 
									(
										select top 1
											  ApplicationdateCompaired วันที่สมัคร
											, @EndDate วันสิ้นสุด
											, datediff(d,ApplicationdateCompaired,@EndDate) as วันที่สมัครถึงปัจจุบัน
											, datepart(weekday, ApplicationdateCompaired) แปลงวันสมัคร
											, case datepart(weekday, ApplicationdateCompaired)
													when 7 then (datediff(d,ApplicationdateCompaired,dateadd(d,5,@EndDate))) / 7 
													when 6 then (datediff(d,ApplicationdateCompaired,dateadd(d,4,@EndDate))) / 7 
													when 5 then (datediff(d,ApplicationdateCompaired,dateadd(d,3,@EndDate))) / 7 
													when 4 then (datediff(d,ApplicationdateCompaired,dateadd(d,2,@EndDate))) / 7 
													when 3 then (datediff(d,ApplicationdateCompaired,dateadd(d,1,@EndDate))) / 7 
													when 2 then (datediff(d,ApplicationdateCompaired,dateadd(d,0,@EndDate))) / 7 
													when 1 then (datediff(d,ApplicationdateCompaired,dateadd(d,7,@EndDate))) / 7 
												end วันอาทิตย์
											, (select count(*)as holiday from Server04.silkspan04.dbo.cc_holiday where holidaydate between ApplicationdateCompaired and  @EndDate)วันหยุดนักขัตฤกษ์
											, (select count(distinct(convert(varchar(10),callestablished,126))) from dbcenter.voip.dbo.transection where list_tid = insur_center.tid and datediff(second, callestablished, callend) >= 30)วันที่โทร

										from  insur_center
										where  tid = insur.tid
									 )TempFreq
							)Freq
                            , isnull((select count(callstart) from dbcenter.voip.dbo.transection where list_tid = insur.tid),0) Attemp
                        FROM
                        (
                            SELECT		
										tid
										,case 
											when datediff(s,applicationdate,Convert(varchar(10),insur_center.applicationdate,121) + ' 17:30') > 0 then applicationdate
											when datediff(s,applicationdate,Convert(varchar(10),insur_center.applicationdate,121) + ' 17:30') <= 0 then Dateadd(d,1,applicationdate)
										end ApplicationdateCompaired
                            FROM insur_center 
                            WHERE  tid in (1@tid)
                            
                        ) insur 