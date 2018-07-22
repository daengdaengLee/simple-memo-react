import _ from '../library/underscore';

const isSameId = id =>
  _.pipe(
    _.property('id'),
    _.partial(_.isEqual, _, id),
  );

const setNewMemo = newMemo => state => ({ ...state, newMemo });

const unshiftMemos = memo => state => ({
  ...state,
  memos: [memo, ...state.memos],
});

const filterMemos = predi => state =>
  _.go(state, _.property('memos'), _.partial(_.filter, _, predi), memos => ({
    ...state,
    memos,
  }));

const replaceMemos = (idx, memo) => state =>
  _.go(
    state,
    _.property('memos'),
    memos => [...memos.slice(0, idx), memo, ...memos.slice(idx + 1)],
    memos => ({ ...state, memos }),
  );

const changeMemo = (id, changer) => state => {
  const idx = _.findIndex(state.memos, isSameId(id));
  const changedMemo = _.go(
    state,
    _.property('memos'),
    _.partial(_.find, _, isSameId(id)),
    changer,
  );
  return replaceMemos(idx, changedMemo)(state);
};

const createNewMemo = id => state =>
  _.go(
    state,
    unshiftMemos({
      id,
      content: state.newMemo,
      isEditing: false,
      editingContent: '',
    }),
    setNewMemo(''),
  );

const deleteMemo = id => state =>
  _.go(state, filterMemos(_.go(id, isSameId, _.negate)));

const startEdit = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({
      ...memo,
      isEditing: true,
      editingContent: memo.content,
    })),
  );

const inputEditing = (id, content) => state =>
  _.go(state, changeMemo(id, memo => ({ ...memo, editingContent: content })));

const saveEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({
      ...memo,
      content: memo.editingContent,
      isEditing: false,
      editingContent: '',
    })),
  );

const cancelEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({ ...memo, isEditing: false, editingContent: '' })),
  );

const resetEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({ ...memo, editingContent: memo.content })),
  );

const validateMemo = memo => memo.trim().length > 0;

const validateCreateNewMemo = state => validateMemo(state.newMemo);

const validateEditingMemo = (id, state) =>
  _.go(
    state,
    _.property('memos'),
    _.partial(_.find, _, isSameId(id)),
    _.property('editingContent'),
    validateMemo,
  );

export {
  setNewMemo,
  validateCreateNewMemo,
  createNewMemo,
  deleteMemo,
  startEdit,
  inputEditing,
  validateEditingMemo,
  saveEditing,
  cancelEditing,
  resetEditing,
};
