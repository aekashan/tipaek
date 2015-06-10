select * from a 
inner join x on a.username = x.username 
			and datediff(d,a.date,x.date) = 0