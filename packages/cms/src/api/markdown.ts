
import { Api, Post } from "@midwayjs/hooks";
import MarkdownIt from "markdown-it";

import { linkPlugin } from '../..//markdown-it-plugins/link';
import { highlight } from "../../markdown-it-plugins/highlight"
import { highlightLinePlugin } from "../../markdown-it-plugins/highlightLines"
import { preWrapperPlugin } from "../../markdown-it-plugins/preWrapper"
import { lineNumberPlugin } from "../../markdown-it-plugins/lineNumbers"

// @ts-ignore
import taskListPlugin from "markdown-it-task-lists"

// @ts-ignore
import attrsPlugin from "markdown-it-attrs"

// @ts-ignore
import deflistPlugin from "markdown-it-deflist"
// @ts-ignore
import markPlugin from "markdown-it-mark"

export const transform = Api(Post(), async (content: string) => {
  let result = ""
  const md = new MarkdownIt({
    xhtmlOut: true,
    highlight
  })
  md
    .use(preWrapperPlugin)
    .use(linkPlugin, {
      target: '_blank',
      rel: 'noopener noreferrer'
    })
    .use(highlightLinePlugin)
    .use(lineNumberPlugin)
    .use(deflistPlugin)
    .use(attrsPlugin)
    .use(markPlugin)
    .use(taskListPlugin)
  result = md.render(content)
  const keywordPool: [string, string][] = [
    [`:::warning`, `<n-alert title="Warning" type="warning">`],
    [`:::`, `</n-alert>`],
    ["<p>", `<n-p>`],
    ["</p>", "</n-p>"],
    [`<h1>`, `<n-h1>`],
    ["</h1>", "</n-h1>"],
    [`<h2>`, `<n-h2 type="info" prefix="bar"><n-text>`],
    ["</h2>", "</n-text></n-h2>"],
    ["<h3>", "<n-h3>"],
    ["</h3>", "</n-h3>"],
    ["<h4>", "<n-h4>"],
    ["</h4>", "</n-h4>"],
    ["<h5>", "<n-h5>"],
    ["</h5>", "</n-h5>"],
    ["<h6>", "<n-h6>"],
    ["</h6>", "</n-h6>"],
    ["<blockquote>", "<n-blockquote>"],
    ["</blockquote>", "</n-blockquote>"],
    ["<img", "<n-image"],
    ["<a", "<n-a"],
    ["</a>", `&nbsp;<n-icon style="top:1px;"><ExternalLinkAlt/></n-icon></n-a>`],
    ["<ol>", "<n-ol>"],
    ["</ol>", "</n-ol>"],
    ["<ul", "<n-ul "],
    ["</ul>", "</n-ul>"],
    ["<li", "<n-li "],
    ["</li>", "</n-li>"],
    ["<mark", `<n-text tag="mark" type="warning"`],
    ["</mark>", "</n-text>"]
  ]
  for (const [s, t] of keywordPool) {
    result = result.replace(new RegExp(s, "g"), t)
  }
  result = `<div>${result}<n-divider title-placement="left">到底了</n-divider></div>`
  return {
    result
  }
})