import Card from "antd/es/card/Card"

import styles from './style.module.css'

export const NotFound = () => {
    return (
        <div className={styles.container}>
            <Card title="404 Page not found" bordered={false} style={{ width: 300 }}>
                <p>Page does not exist.</p>
            </Card>
        </div>
    )
}