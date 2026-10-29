import styles from './ProductStageBlock.module.css'

export function ProductStageBlock({ tone }: { tone: 'wine' | 'olive' }) {
  return <div className={`block ${styles[tone]}`} />
}
