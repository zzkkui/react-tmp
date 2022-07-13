import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { breadCrumbsAtom, collapsedAtom, hideHeaderAtom, menuOpenKeysAtom } from 'src/store/global'

function RedisDetail() {
  const setHideHeaderState = useSetRecoilState(hideHeaderAtom)
  const setCollapsedState = useSetRecoilState(collapsedAtom)
  const setBreadCrumbsState = useSetRecoilState(breadCrumbsAtom)
  const setMenuOpenKeysState = useSetRecoilState(menuOpenKeysAtom)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    setHideHeaderState(true)
    setCollapsedState(true)
    setBreadCrumbsState({ prev: '/redis', paths: [{ name: 'Redis', path: '/redis' }, { name: id }] })
    setMenuOpenKeysState([])
    return () => {
      setHideHeaderState(false)
      setCollapsedState(false)
      setBreadCrumbsState({})
    }
  }, [id])
  return <div>RedisDetail</div>
}

export default RedisDetail
