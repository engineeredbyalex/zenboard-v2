import Layout from '@/components/Layout'
import React from 'react'

function customization() {
    return (
        <Layout>
            <div className='flex flex-col'>
                <h3>Customize the Header</h3>
                <h4 > Change the Header Color</h4>
                <input type='color' />
                <h4 > Change the Header text</h4>
                <input type='text' placeholder='Change the header text' />
                <h4> Change the Image Background</h4>
            </div>
        </Layout>
    )
}

export default customization