export default {
  activeName: state => {
    let names = [
      {
        name: 'linda',
        id: 0
      },
      {
        name: 'tom',
        id: 1
      },
      {
        name: 'sam',
        id: 2
      },
      {
        name: 'pete',
        id: 3
      },
      {
        name: 'loise',
        id: 4
      }
    ]
    let activeName = names.filter(item => {
      return item.name.includes(state.user)
    })
    return activeName
  }
}
