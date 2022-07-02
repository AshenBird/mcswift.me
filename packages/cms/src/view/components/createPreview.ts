import { defineComponent } from "vue"
import {
  NA,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
  NP,
  NUl,
  NOl,
  NLi,
  NBlockquote,
  NImage,
  NText,
  NCheckbox,
  NDivider,
  NAlert,
  NIcon,
} from "naive-ui"

import { ExternalLinkAlt } from "@vicons/fa";
export const createPreview = (template: string = "<div>无</div>") => {
  return defineComponent({
    components: {
      NA,
      NH1,
      NH2,
      NH3,
      NH4,
      NH5,
      NH6,
      NP,
      NUl,
      NOl,
      NLi,
      NBlockquote,
      NImage,
      NText,
      NCheckbox,
      NDivider,
      NAlert,
      NIcon,
      ExternalLinkAlt
    },
    template
  })
}