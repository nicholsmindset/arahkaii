-- Create analytics functions for Supabase

-- Top products function
create or replace function get_top_products(days integer default 30)
returns table (
  product_id uuid,
  total_quantity numeric,
  total_revenue numeric
) as $$
begin
  return query
  select oi.product_id, 
         sum(oi.quantity) as total_quantity,
         sum(oi.price * oi.quantity) as total_revenue
  from order_items oi
  join orders o on o.id = oi.order_id
  where o.status = 'completed'
  and o.created_at >= now() - interval '1 day' * days
  group by oi.product_id
  order by total_quantity desc
  limit 5;
end;
$$ language plpgsql;

-- User demographics function
create or replace function get_user_demographics()
returns table (
  age_group text,
  location text,
  age_count integer,
  location_count integer
) as $$
begin
  return query
  with age_groups as (
    select age_group, count(*) as age_count
    from users
    where age_group is not null
    group by age_group
  ),
  locations as (
    select location, count(*) as location_count
    from users
    where location is not null
    group by location
  )
  select 
    a.age_group,
    l.location,
    a.age_count,
    l.location_count
  from age_groups a
  full outer join locations l on true;
end;
$$ language plpgsql;

-- Product categories function
create or replace function get_product_categories()
returns table (
  category text,
  product_count integer,
  total_quantity numeric,
  total_revenue numeric
) as $$
begin
  return query
  select 
    p.category,
    count(distinct p.id) as product_count,
    coalesce(sum(oi.quantity), 0) as total_quantity,
    coalesce(sum(oi.price * oi.quantity), 0) as total_revenue
  from products p
  left join order_items oi on oi.product_id = p.id
  left join orders o on o.id = oi.order_id
  where o.status = 'completed'
  group by p.category
  order by total_revenue desc;
end;
$$ language plpgsql;

-- Vendor performance function
create or replace function get_vendor_performance(vendor_id uuid)
returns table (
  vendor_id uuid,
  vendor_name text,
  total_sales numeric,
  total_revenue numeric,
  average_rating numeric,
  order_count integer,
  on_time_deliveries integer,
  delayed_deliveries integer,
  total_deliveries integer
) as $$
begin
  return query
  select 
    v.id as vendor_id,
    v.name as vendor_name,
    coalesce(sum(o.total_amount), 0) as total_sales,
    coalesce(sum(o.total_amount), 0) as total_revenue,
    coalesce(avg(r.rating), 0) as average_rating,
    count(distinct o.id) as order_count,
    sum(case when d.status = 'delivered' and d.delivery_date <= d.expected_delivery_date then 1 else 0 end) as on_time_deliveries,
    sum(case when d.status = 'delivered' and d.delivery_date > d.expected_delivery_date then 1 else 0 end) as delayed_deliveries,
    count(distinct d.id) as total_deliveries
  from vendors v
  left join orders o on o.vendor_id = v.id
  left join reviews r on r.vendor_id = v.id
  left join deliveries d on d.order_id = o.id
  where v.id = vendor_id
  group by v.id, v.name;
end;
$$ language plpgsql;
