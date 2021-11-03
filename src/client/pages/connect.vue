<script setup lang="ts">
import {NText, NUl, NLi, NP, NH4} from "naive-ui"
import type {Store, UpdateMeta} from "../../../interface"
import { inject } from "vue"
const store = inject("custoStore") as Store
const updateMeta = inject("updateMeta") as UpdateMeta;
updateMeta({ title: "联系我" });
</script>
<template>
<div style="padding: 30px 15px; font-size: 16px; max-width: 800px;">
  <n-text :depth="1">
    如果你希望联系到我，目前可以发邮件到以下邮箱:
    <div style="margin:10px 0;">
      <n-text :depth="3" type="info">
        <address>work@mcswift.pro</address>
      </n-text>
    </div>
  </n-text>
  <br>
  <n-text :depth="1">
    出于以下目的，你都可以来找我:
    <br>
    <n-h4>工作机会</n-h4>
    <n-p :depth="3" class="mcswift-paragraph">
      我对于工作机会，持有广泛的兴趣，而不仅仅是前端开发工作。我希望能够从事富有创造性、进取性和可能性的工作。既可以是我所熟悉前端开发领域，抑或是我擅长的事务性的工作——你可能并没有办法轻易的发现我于此的长处。对于职业的发展我始终抱着一个开放性的心态，这并不是因为我对于我的职业没有规划，或对我惯常的工作不够热爱，而是这个世界足够庞大，能够让人类终其一生探索不尽。
    </n-p>
    <n-p class="mcswift-paragraph">
      <n-text type="warning">
        提供工作机会、索取简历，请使用公司邮箱发件，谢谢。
      </n-text>
    </n-p>
    <n-h4>设计资源</n-h4>
    <n-p :depth="3" class="mcswift-paragraph">
      作为一个工程师，设计属于我比较薄弱的点。如果你是一名设计师，你愿以通过设计帮助我完善我的网站，除了作品署名之外，作为回报我也可以按照对等原则帮助你完成一些开发工作，比如你的人网站、小程序之类的。
    </n-p>
    <n-h4>问题</n-h4>
    <n-p :depth="3" class="mcswift-paragraph">
      我非常愿意解决各种问题，一方面出于我的好奇心，另一方面出于扩展自己边界的意愿。如果你遇到了问题，不妨告诉我，看我能不能解决。出于种种原因，我无法保证对你的邮件有所回复，但我一定会认真对待。
    </n-p>
    <n-h4>博客</n-h4>
    <n-p :depth="3" class="mcswift-paragraph">
      未来我会就不同的主题，撰写一些博客，如果你有什么想看的，或者我有什么错漏，都欢迎提出。
    </n-p>
    <n-h4>其他机会</n-h4>
    <n-p :depth="3" class="mcswift-paragraph">
      除了这些我想到的，如果你有其他觉得可以叫我一起做的事情，也可以给我来信。
    </n-p>

  </n-text>
</div>

</template>