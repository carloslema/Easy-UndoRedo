import { Vue } from "vue-property-decorator";
import UndoRedoStack from "./UndoRedoStackMixin";
/**
 * This mixin provide easy access to the nearest undo redo stack in the ancestor chain of components that incorporate it.
 */
export default class UndoRedoClientMixin extends Vue {
    /**
     * The nearest undo redo stack in the ancestor chain or null of none exists.
     */
    get undoRedoStack(): UndoRedoStack;
    protected getAncestorWithProperty(propertyName: string): Vue;
}
