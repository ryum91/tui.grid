tui.util.defineNamespace("fedoc.content", {});
fedoc.content["base_collection.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Base class for Collections\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Backbone = require('backbone');\nvar _ = require('underscore');\n\nvar common = require('./common');\n\n/**\n * Base class for Collection\n * @module base/collection\n * @mixes module:base/common\n */\nvar Collection = Backbone.Collection.extend(/**@lends module:base/collection.prototype */{\n    /**\n     * collection 내 model 들의 event listener 를 제거하고 메모리에서 해제한다.\n     * @returns {object} this object\n     */\n    clear: function() {\n        this.each(function(model) {\n            model.stopListening();\n            model = null;\n        });\n        this.reset([], {silent: true});\n\n        return this;\n    }\n});\n\n_.assign(Collection.prototype, common);\n\nmodule.exports = Collection;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"