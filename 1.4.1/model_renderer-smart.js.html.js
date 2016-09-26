tui.util.defineNamespace("fedoc.content", {});
fedoc.content["model_renderer-smart.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview 스마트 랜더링을 지원하는 Renderer 모ㄷ델\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar _ = require('underscore');\n\nvar Renderer = require('./renderer');\nvar util = require('../common/util');\n\n/**\n *  View 에서 Rendering 시 사용할 객체\n *  Smart Rendering 을 지원한다.\n *  @module model/renderer-smart\n * @extends module:model/renderer\n */\nvar SmartRenderer = Renderer.extend(/**@lends module:model/renderer-smart.prototype */{\n    /**\n     * @constructs\n     */\n    initialize: function() {\n        Renderer.prototype.initialize.apply(this, arguments);\n        this.on('change:scrollTop', this._onChange, this);\n        this.listenTo(this.dimensionModel, 'change:bodyHeight', this._onChange, this);\n\n        this.setOwnProperties({\n            hiddenRowCount: 10,\n            criticalPoint: 3\n        });\n    },\n    /**\n     * bodyHeight 가 변경 되었을때 이벤트 핸들러\n     * @private\n     */\n    _onChange: function() {\n        if (this._isRenderable(this.get('scrollTop'))) {\n            this.refresh();\n        }\n    },\n\n    /**\n     * SmartRendering 을 사용하여 rendering 할 index 범위를 결정한다.\n     * @param {Number} scrollTop    랜더링 범위를 결정하기 위한 현재 scrollTop 위치 값\n     * @private\n     */\n    _setRenderingRange: function(scrollTop) {\n        var dimensionModel = this.dimensionModel,\n            dataModel = this.dataModel,\n            rowHeight = dimensionModel.get('rowHeight'),\n            displayRowCount = dimensionModel.get('displayRowCount'),\n            startIndex = Math.max(0, Math.ceil(scrollTop / (rowHeight + 1)) - this.hiddenRowCount),\n            endIndex = Math.min(dataModel.length - 1, startIndex + displayRowCount + (this.hiddenRowCount * 2)),\n            top;\n\n        if (dataModel.isRowSpanEnable()) {\n            startIndex += this._getStartRowSpanMinCount(startIndex);\n            endIndex += this._getEndRowSpanMaxCount(endIndex);\n        }\n        top = (startIndex === 0) ? 0 : util.getHeight(startIndex, rowHeight);\n\n        this.set({\n            top: top,\n            startIndex: startIndex,\n            endIndex: endIndex\n        });\n    },\n\n    /**\n     * 렌더링을 시작하는 행에 rowSpan 정보가 있으면, count 값이 가장 작은 행의 값을 반환한다.\n     * @param {number} startIndex 시작하는 행의 Index\n     * @returns {number} rowSpan의 count 값 (0 이하)\n     * @private\n     */\n    _getStartRowSpanMinCount: function(startIndex) {\n        var firstRow = this.dataModel.at(startIndex),\n            result = 0,\n            counts;\n\n        if (firstRow) {\n            counts = _.pluck(firstRow.getRowSpanData(), 'count');\n            counts.push(0); // count가 음수인 경우(mainRow가 아닌 경우)에만 최소값을 구함. 없으면 0\n            result = _.min(counts);\n        }\n        return result;\n    },\n\n    /**\n     * 렌더링할 마지막 행에 rowSpan 정보가 있으면, count 값이 가장 큰 행의 값을 반환한다.\n     * @param {number} endIndex 마지막 행의 Index\n     * @returns {number} rowSpan의 count 값 (0 이상)\n     * @private\n     */\n    _getEndRowSpanMaxCount: function(endIndex) {\n        var lastRow = this.dataModel.at(endIndex),\n            result = 0,\n            counts;\n\n        if (lastRow) {\n            counts = _.pluck(lastRow.getRowSpanData(), 'count');\n            counts.push(0); // count가 양수인 경우(mainRow인 경우)에만 최대값을 구함. 없으면 0\n            result = _.max(counts);\n        }\n        return result;\n    },\n    /**\n     * scrollTop 값 에 따라 rendering 해야하는지 판단한다.\n     * @param {Number} scrollTop 랜더링 범위를 결정하기 위한 현재 scrollTop 위치 값\n     * @returns {boolean}    랜더링 해야할지 여부\n     * @private\n     */\n    _isRenderable: function(scrollTop) {\n        var dimensionModel = this.dimensionModel,\n            dataModel = this.dataModel,\n            rowHeight = dimensionModel.get('rowHeight'),\n            bodyHeight = dimensionModel.get('bodyHeight'),\n            rowCount = dataModel.length,\n            displayStartIdx = Math.max(0, Math.ceil(scrollTop / (rowHeight + 1))),\n            displayEndIdx = Math.min(dataModel.length - 1, Math.floor((scrollTop + bodyHeight) / (rowHeight + 1))),\n            startIndex = this.get('startIndex'),\n            endIndex = this.get('endIndex');\n\n        //시작 지점이 임계점 이하로 올라갈 경우 return true\n        if (startIndex !== 0) {\n            if (startIndex + this.criticalPoint > displayStartIdx) {\n                return true;\n            }\n        }\n        //마지막 지점이 임계점 이하로 내려갔을 경우 return true\n        if (endIndex !== rowCount - 1) {\n            if (endIndex - this.criticalPoint &lt; displayEndIdx) {\n                return true;\n            }\n        }\n        return false;\n    }\n});\n\nmodule.exports = SmartRenderer;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"