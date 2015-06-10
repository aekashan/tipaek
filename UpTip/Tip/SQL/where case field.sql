insert into @tableTemp
select 
--			1 orderRow
--			,d.company company
--			,upper(a.producttype)as producttype 
--			,sum(a.gross)			as gross
--
--			,sum(a.netpremium)	as netpremium 
--			--comm
--			,max(d.comm_percent)as comm_percent
--			,sum(comm)			as comm
--			,sum(comm_vat)		as comm_vat
--			,sum(comm_wht)		as comm_wht
--			,sum((comm + comm_vat)- comm_wht)	as total_comm
--			,0					as savemoney
--			,0					as payable
--			,getdate()			as save_moneydate
--			--commOv
--			,max(case d.ovadd_type when 0 then 
--												(case	when a.ov_percent	>= 100		then a.ovadd_percent
--														when a.ovadd_percent >= 100		then a.ov_percent
--														else a.ov_percent + a.ovadd_percent
--												end )
--				end) as commov_percentt
--			,sum(case d.ovadd_type when 0 then a.ov+a.ovadd end) commov
--			,sum(case d.ovadd_type when 0 then ov_vat+ovadd_vat end) commovadd_vat
--			,sum(case d.ovadd_type when 0 then ov_wht+ovadd_wht end) commov_wht
--			,0					as comm_ovmoney
--			,0					as commov_savemoney
--			,0					as commov_payable 
--			--OutCommOv
--			,max(case d.ovadd_type when 1 then 
--												(case	when a.ov_percent	>= 100		then a.ovadd_percent
--														when a.ovadd_percent >= 100	then a.ov_percent
--														else a.ov_percent + a.ovadd_percent
--												end ) 
--				end )as Outcommov_percent
--			,sum(case d.ovadd_type when 1 then ov+ovadd end) Outcommov
--			,sum(case d.ovadd_type when 1 then ov_vat+ovadd_vat end) Outcommovadd_vat
--			,sum(case d.ovadd_type when 1 then ov_wht+ovadd_wht end) Outcommov_wht
--			,0					as Outcomm_ovmoney
--			,0					as Outcommov_savemoney
--			,0					as Outcommov_payable 
from insur_commission a
	join insur_center b		 on a.tid = b.tid
	join insur_follow c		 on b.tid = c.tid
	join commission_config d on a.company		= d.company
							and	a.table_name	= d.table_name
							and a.producttype	= d.producttype
							and a.comm_percent	= d.comm_percent
							and a.ov_percent	= d.ov_percent
							and a.ovadd_percent = d.ovadd_percent
where (case 
			when a.table_name = 'insur_muangthai_car'	and a.producttype <> '¾Ãº.'	then a.cover_date
			when a.table_name = 'insur_cp_car'			and a.producttype = '¾Ãº.'	then a.cover_date
			when a.producttype <> '¾Ãº.'		then Convert(DateTime,Convert(varchar(4),b.YearStart) + '-' + Convert(varchar(2),b.MonthStart) + '-' + Convert(varchar(2),b.DayStart),120)
			when a.producttype =  '¾Ãº.'		then c.update_prb
	   end) between @StartDate and @EndDate

		group by d.company,a.producttype
		order by d.company