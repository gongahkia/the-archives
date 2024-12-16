import { NodeEditor } from 'rete';
import { VueRenderPlugin } from 'rete-vue-render-plugin'; 

const container = document.getElementById('rete');
const editor = new NodeEditor('demo@0.1.0', container);

editor.use(VueRenderPlugin);

class NumberNode extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        const input = new Rete.Input('num', "Number", numSocket);
        node.addInput(input);
        return node;
    }

    worker(node, inputs, outputs) {
        outputs['num'] = inputs['num'][0];
    }
}

editor.register(new NumberNode());

