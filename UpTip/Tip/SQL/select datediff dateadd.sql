select                                        
	CASE WHEN DATEDIFF(DAY, d.startdate, DATEADD(DAY, 1, GetDate())) >= 30 THEN 'OLD' ELSE 'NEW' END AS AgeWork
	
	--and datediff(day,a.lastaction,getdate()) between 1 and 7 --ย้อนดึงมา 1 - 7 วันที่แล้ว