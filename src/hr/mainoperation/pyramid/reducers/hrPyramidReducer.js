import {
  HR_PYRAMID_FETCH_BUKRS_TREE,
  HR_PYRAMID_TREE_CHANGED,
  //HR_PYRAMID_TREE_DELETED,
  HR_PYRAMID_BLANK_ITEM,
  HR_PYRAMID_FORM_MODAL_TOGGLE,
  HR_PYRAMID_FETCH_ITEM,
  HR_PYRAMID_ITEM_UPDATED,
} from '../actions/hrPyramidAction';
import {
  // removeNodeAtPath,
  changeNodeAtPath,
} from 'react-sortable-tree';

const INITIAL_STATE = {
  treeData: [],
  formModalOpened: false,
  item: {},
};

const getNodeKey = ({ node: { id } }) => id;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HR_PYRAMID_FETCH_BUKRS_TREE:
    case HR_PYRAMID_TREE_CHANGED:
      return { ...state, treeData: action.payload };

    case HR_PYRAMID_BLANK_ITEM:
    case HR_PYRAMID_FETCH_ITEM:
      return { ...state, item: action.payload };

    case HR_PYRAMID_ITEM_UPDATED:
      const updatedNode = action.payload;
      const path = [updatedNode.id];
      const parentId = updatedNode.parentId;
      while (parentId) {}
      const updatedTreeData = changeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey,
        newNode: updatedNode,
      });
      return { ...state, treeData: updatedTreeData, formModalOpened: false };

    case HR_PYRAMID_FORM_MODAL_TOGGLE:
      return { ...state, formModalOpened: action.payload };

    default:
      return state;
  }
}
