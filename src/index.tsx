import { observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"
import posed, { PoseGroup } from "react-pose"
import styled from "styled-components"

const duration = 250

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    transition: { duration, ease: "easeOut" },
    beforeChildren: true,
  },
  exit: {
    opacity: 1,
    transition: { duration, ease: "easeIn" },
  },
})

const AnimatedBox = posed.div({
  preEnter: {
    opacity: 0,
    translateX: 16,
    transition: { duration, ease: "easeIn" },
  },
  enter: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: { duration, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    translateY: 20,
    transition: { duration, ease: "easeIn" },
  },
})

const Box = styled(AnimatedBox)`
  width: 500px;
  height: 500px;
  padding: 1rem;
`

const Nav = styled.nav`
  margin-bottom: 1rem;
`

@observer
export class App extends React.Component {
  pages = [
    { key: "page1", content: "wow", color: "pink" },
    { key: "page2", content: "awesome", color: "lightblue" },
    { key: "page3", content: "amazing", color: "lightgreen" },
  ]

  @observable
  currentPage = 0

  render() {
    const currentPage = this.pages[this.currentPage]
    return (
      <main>
        <Nav>
          {this.pages.map((page, index) => (
            <button key={page.key} onClick={() => (this.currentPage = index)}>
              {page.key}
            </button>
          ))}
        </Nav>

        <PoseGroup animateOnMount preEnterPose="preEnter">
          <RouteContainer key={currentPage.key}>
            <Box style={{ backgroundColor: currentPage.color }}>
              {currentPage.content}
            </Box>
          </RouteContainer>
        </PoseGroup>
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
