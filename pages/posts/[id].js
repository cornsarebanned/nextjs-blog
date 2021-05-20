import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'



export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
    // If fallback is false, 
    //then any paths not returned by getStaticPaths will result in a 404 page.
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }

//   export default function Post({ postData }) {
//     return (
//       <Layout>
//         <Head>
//             <title>{postData.title}</title>
//         </Head>
//         <br />
//         {postData.id}
//         <br />
//         <Date dateString={postData.date} />
//         <br />
//         <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//       </Layout>
//     )
//   }



export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingMd}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}