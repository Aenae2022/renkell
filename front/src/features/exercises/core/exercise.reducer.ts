export function exerciseReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, status: "running" }

    case "ANSWER": {
      const item = state.items[state.currentIndex]
      const isCorrect = item.validate(action.payload)

      return {
        ...state,
        answers: [
          ...state.answers,
          {
            itemId: item.id,
            answer: action.payload,
            isCorrect,
          },
        ],
      }
    }

    case "NEXT": {
      const next = state.currentIndex + 1

      if (next >= state.items.length) {
        return { ...state, status: "finished" }
      }

      return { ...state, currentIndex: next }
    }

    default:
      return state
  }
}