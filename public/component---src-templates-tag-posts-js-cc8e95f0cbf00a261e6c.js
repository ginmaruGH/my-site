(self.webpackChunkelementary_elementary=self.webpackChunkelementary_elementary||[]).push([[580],{7974:function(e,t,a){"use strict";var n=a(7294),r=a(5444),l=a(8415),c=function(e){var t=e.node,a=t.frontmatter.pubDate?(0,l.O0)(t.frontmatter.pubDate):null,c=(0,l.Ej)(""+t.fields.slug);return n.createElement("article",{className:"post",key:t.id},n.createElement("div",{className:"post-row"},n.createElement(r.Link,{className:"post-link",to:"/blog"+c},n.createElement("h3",null,t.frontmatter.title),n.createElement("time",{dateTime:t.frontmatter.published},a)),t.excerpt&&n.createElement("p",{className:"paragraph",itemProp:"description",dangerouslySetInnerHTML:{__html:t.frontmatter.description}})))};t.Z=function(e){var t=e.data;return n.createElement("div",{className:"posts"},t.map((function(e){return n.createElement(c,{key:e.id,node:e})})))}},3226:function(e,t,a){"use strict";a.r(t);var n=a(7294),r=a(5193),l=a(7974),c=a(3751);t.default=function(e){var t=e.data,a=e.pageContext,o=e.location,s=a.tag,i=t.allMarkdownRemark.totalCount,m=t.allMarkdownRemark.nodes,u=1===i?" post found.":" posts found.",p={path:o.pathname,title:"Tag: "+s,desc:'"'+s+'"タグの記事一覧です。'};return n.createElement(r.Z,{pageName:"tag-page"},n.createElement(c.Z,{postMeta:p}),n.createElement("article",{className:"blog-post container",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("div",{className:"container"},n.createElement("h1",null,"Posts tagged: [",s,"]"),n.createElement("p",{className:"subtitle"},n.createElement("span",{className:"count"},i),u))),n.createElement("section",{className:"container index"},n.createElement(l.Z,{data:m}))))}},8415:function(e,t,a){"use strict";function n(e){return e&&e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-")}a.d(t,{lV:function(){return n},Ej:function(){return r},O0:function(){return l}});var r=function(e){var t=e.split("/"),a=t.length;return a>3?"/"+t[a-2]+"/":e},l=function(e){var t=e.split(" ");return t[0]=t[0].slice(0,3)+".",t.join(" ")}}}]);
//# sourceMappingURL=component---src-templates-tag-posts-js-cc8e95f0cbf00a261e6c.js.map