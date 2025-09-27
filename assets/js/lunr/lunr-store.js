---
layout: none
---

{%- assign active = page.lang | default: site.active_lang | default: site.lang | default: site.locale | slice: 0,2 -%}

{%- assign is_default = false -%}
{%- if active == site.default_lang -%}
  {%- assign is_default = true -%}
{%- endif -%}

{%- assign lang_prefix = '' -%}
{%- if site.polyglot and site.polyglot.include_default_lang == true -%}
  {%- assign lang_prefix = '/' | append: active -%}
{%- elsif is_default == false -%}
  {%- assign lang_prefix = '/' | append: active -%}
{%- endif -%}
{%- assign prefix_check = '/' | append: active | append: '/' -%}

var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}{%- assign l = true -%}{%- endif -%}

    {%- assign base_docs = c.docs | where_exp:"d","d.search != false" -%}
    {%- assign docs_lang = base_docs | where:"lang", active -%}
    {%- if is_default -%}
      {%- assign docs_nil = base_docs | where_exp:"d","d.lang == nil or d.lang == ''" -%}
      {%- assign docs = docs_lang | concat: docs_nil -%}
    {%- else -%}
      {%- assign docs = docs_lang -%}
    {%- endif -%}

    {%- for doc in docs -%}
      {%- capture teaser -%}{% if doc.header.teaser %}{{ doc.header.teaser }}{% else %}{{ site.teaser }}{% endif %}{%- endcapture -%}

      {%- if site.search_full_content == true -%}
        {%- capture excerpt -%}{{ doc.content
          | newline_to_br
          | replace:"<br />"," "
          | replace:"</p>"," "
          | replace:"</h1>"," "
          | replace:"</h2>"," "
          | replace:"</h3>"," "
          | replace:"</h4>"," "
          | replace:"</h5>"," "
          | replace:"</h6>"," "
          | strip_html
          | strip_newlines
        }}{%- endcapture -%}
      {%- else -%}
        {%- capture excerpt -%}{{ doc.content
          | newline_to_br
          | replace:"<br />"," "
          | replace:"</p>"," "
          | replace:"</h1>"," "
          | replace:"</h2>"," "
          | replace:"</h3>"," "
          | replace:"</h4>"," "
          | replace:"</h5>"," "
          | replace:"</h6>"," "
          | strip_html
          | strip_newlines
          | truncatewords: 50
        }}{%- endcapture -%}
      {%- endif -%}

      {%- capture item_url -%}
        {%- if doc.url contains prefix_check -%}
          {{ doc.url }}
        {%- else -%}
          {{ lang_prefix | append: doc.url }}
        {%- endif -%}
      {%- endcapture -%}

      {
        "title": {{ doc.title | jsonify }},
        "excerpt": {{ excerpt | strip | jsonify }},
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ item_url | relative_url | jsonify }},
        "teaser": {{ teaser | relative_url | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}
  {%- if site.lunr.search_within_pages -%},
    {%- assign base_pages = site.pages | where_exp:"d","d.search != false" | where_exp:"d","d.title != nil" -%}
    {%- assign pages_lang = base_pages | where:"lang", active -%}
    {%- if is_default -%}
      {%- assign pages_nil = base_pages | where_exp:"d","d.lang == nil or d.lang == ''" -%}
      {%- assign pages = pages_lang | concat: pages_nil -%}
    {%- else -%}
      {%- assign pages = pages_lang -%}
    {%- endif -%}
    {%- for doc in pages -%}
      {%- if forloop.last -%}{%- assign l = true -%}{%- endif -%}

      {%- if site.search_full_content == true -%}
        {%- capture excerpt -%}{{ doc.content
          | newline_to_br
          | replace:"<br />"," "
          | replace:"</p>"," "
          | replace:"</h1>"," "
          | replace:"</h2>"," "
          | replace:"</h3>"," "
          | replace:"</h4>"," "
          | replace:"</h5>"," "
          | replace:"</h6>"," "
          | strip_html
          | strip_newlines
        }}{%- endcapture -%}
      {%- else -%}
        {%- capture excerpt -%}{{ doc.content
          | newline_to_br
          | replace:"<br />"," "
          | replace:"</p>"," "
          | replace:"</h1>"," "
          | replace:"</h2>"," "
          | replace:"</h3>"," "
          | replace:"</h4>"," "
          | replace:"</h5>"," "
          | replace:"</h6>"," "
          | strip_html
          | strip_newlines
          | truncatewords: 50
        }}{%- endcapture -%}
      {%- endif -%}

      {%- capture item_url -%}
        {%- if doc.url contains prefix_check -%}
          {{ doc.url }}
        {%- else -%}
          {{ lang_prefix | append: doc.url }}
        {%- endif -%}
      {%- endcapture -%}

      {
        "title": {{ doc.title | jsonify }},
        "excerpt": {{ excerpt | strip | jsonify }},
        "url": {{ item_url | relative_url | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endif -%}
];
