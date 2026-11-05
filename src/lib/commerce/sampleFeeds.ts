/**
 * Realistic Sample Feeds for 1-Click Instant Testing in Commerce Rescue v1
 */

export const SAMPLE_BROKEN_XML_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Apex Performance Gear - Shopify Catalog Export</title>
    <link>https://apexgear.store</link>
    <description>Catalog feed for Google Shopping</description>
    
    <!-- Item 1: Critical: Insecure HTTP image, Invalid availability enum, Currency mismatch -->
    <item>
      <g:id>APX-JACKET-RED-L</g:id>
      <g:title>All-Weather Tactical Alpine Shell Jacket - Extreme Cold Edition [FREE SHIPPING BUY NOW]</g:title>
      <g:description><![CDATA[<p>Durable 3-layer waterproof mountaineering shell with taped seams.</p>]]></g:description>
      <g:link>https://apexgear.store/products/alpine-shell?variant=4821</g:link>
      <g:image_link>http://img.apexgear.store/products/alpine-red.jpg</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>189.00 USD</g:price>
      <g:sale_price>199.00 USD</g:sale_price>
      <g:brand>Apex Gear</g:brand>
      <g:gtin>00810012345678</g:gtin>
      <g:condition>new</g:condition>
    </item>

    <!-- Item 2: Critical: Invalid GTIN Checksum, Contradictory identifier_exists, Title all-caps -->
    <item>
      <g:id>APX-BOOTS-TRAIL-42</g:id>
      <g:title>CARBON TRAIL RUNNING SHOES - MENS ULTRA PERFORMANCE 2026 EDITION</g:title>
      <g:description>Ultra-lightweight composite rock plate trail running footwear for ultra-marathons.</g:description>
      <g:link>https://apexgear.store/products/trail-runner</g:link>
      <g:image_link>https://cdn.apexgear.store/products/trail-runner-42.png</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>120.00 USD</g:price>
      <g:brand>Apex Gear</g:brand>
      <g:gtin>123456789013</g:gtin>
      <g:identifier_exists>no</g:identifier_exists>
      <g:condition>new</g:condition>
    </item>

    <!-- Item 3: Critical: Duplicate ID collision with Item 1, Missing description -->
    <item>
      <g:id>APX-JACKET-RED-L</g:id>
      <g:title>Alpine Shell Jacket (Replacement SKU)</g:title>
      <g:description></g:description>
      <g:link>http://apexgear.store/products/alpine-shell</g:link>
      <g:image_link>https://cdn.apexgear.store/products/alpine-v2.jpg</g:image_link>
      <g:availability>backorder</g:availability>
      <g:price>$189.00</g:price>
      <g:brand>Apex Gear</g:brand>
      <g:condition>new</g:condition>
    </item>

    <!-- Item 4: 100% Fully Compliant Product -->
    <item>
      <g:id>APX-THERMAL-SOCKS-01</g:id>
      <g:title>Merino Wool Alpine Thermal Socks (Charcoal Grey)</g:title>
      <g:description>Durable heavyweight merino wool blend thermal socks designed for sub-zero alpine conditions and blister prevention.</g:description>
      <g:link>https://apexgear.store/products/thermal-socks</g:link>
      <g:image_link>https://cdn.apexgear.store/products/thermal-socks-charcoal.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>24.50 USD</g:price>
      <g:sale_price>19.50 USD</g:sale_price>
      <g:brand>Apex Gear</g:brand>
      <g:gtin>00012345678905</g:gtin>
      <g:condition>new</g:condition>
      <g:google_product_category>1604</g:google_product_category>
    </item>
  </channel>
</rss>`;

export const SAMPLE_BROKEN_CSV_FEED = `id,title,description,link,image_link,availability,price,brand,gtin,condition
SKU-WATCH-001,"TITANIUM DIVE WATCH 300M AUTOMATIC - LIMITED TIME DISCOUNT","<p>Professional diver timepiece rated to 300 meters.</p>",https://store.example.com/watch,http://cdn.store.example.com/watch.jpg,in stock,$450.00,Chronos,123456789012,new
SKU-STRAP-SILICONE,"Silicone Replacement Watch Strap (22mm Orange)",High-grade fluoroelastomer waterproof diving strap.,https://store.example.com/strap,https://cdn.store.example.com/strap.jpg,available,29.99 USD,Chronos,00810012345679,new
SKU-WATCH-001,"Titanium Dive Watch Duplicate SKU",Thin desc,http://store.example.com/watch-dup,https://cdn.store.example.com/watch-dup.jpg,out_of_stock,450.00 USD,Chronos,,new`;

export const SAMPLE_CLEAN_CSV_FEED = `id,title,description,link,image_link,availability,price,sale_price,brand,gtin,condition,google_product_category
NX-HOODIE-BLK-M,"Nuuvixx Engineering Heavyweight Hoodie (Black, M)","Heavyweight 450gsm organic French terry cotton pullover engineered with double-needle construction and reinforced seams for all-day comfort.",https://nuuvixx.com/products/hoodie-m,https://nuuvixx.com/images/hoodie-blk.jpg,in_stock,115.00 USD,95.00 USD,Nuuvixx,00012345678905,new,212
NX-HOODIE-BLK-L,"Nuuvixx Engineering Heavyweight Hoodie (Black, L)","Heavyweight 450gsm organic French terry cotton pullover engineered with double-needle construction and reinforced seams for all-day comfort.",https://nuuvixx.com/products/hoodie-l,https://nuuvixx.com/images/hoodie-blk.jpg,in_stock,115.00 USD,95.00 USD,Nuuvixx,00012345678905,new,212
NX-CAP-MINIMAL,"Technical Low-Profile Structured Dad Cap (Charcoal)","Water-repellent ripstop structured six-panel cap featuring laser-cut ventilation eyelets and custom brushed matte alloy buckle.",https://nuuvixx.com/products/cap,https://nuuvixx.com/images/cap-charcoal.jpg,in_stock,38.00 USD,,Nuuvixx,00012345678905,new,173`;
