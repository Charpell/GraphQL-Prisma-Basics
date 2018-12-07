import getUserId from '../utils/getUserId';

const Subscription = {
  count: {
      subscribe(parent, args, { pubsub }, info) {
          let count = 0

          setInterval(() => {
              count++
              pubsub.publish('count', {
                  count
              })
          }, 1000)

          return pubsub.asyncIterator('count')
      }
  },
  
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {

      // Prisma -> Node -> Client (GraphQl PLayground)

      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info)
    }
  },
  
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  },

  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userid = getUserId(request)

      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userid
            }
          }
        }
      }, info)
    }
  }
}

export { Subscription as default }