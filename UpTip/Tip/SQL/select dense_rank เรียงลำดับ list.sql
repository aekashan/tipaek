select
DENSE_RANK() OVER (PARTITION BY a.list_id ORDER BY  a.agent  ) AS RankAgent --- ���§�ӴѺ Agent �ͧ list