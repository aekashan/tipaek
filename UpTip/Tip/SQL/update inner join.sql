UPDATE R 
SET R.status = '0' 
FROM dbo.ProductReviews AS R
INNER JOIN dbo.products AS P 
       ON R.pid = P.id 
WHERE R.id = '17190' 
  AND P.shopkeeper = '89137';