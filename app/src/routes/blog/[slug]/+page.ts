export async function load({ params }){
    const post = await import(`../${params.slug}.md`)
    const { title, date } = post.metadata
    const Content = post.default
  
    return {
      Content,
      title,
      date,
    }
  }