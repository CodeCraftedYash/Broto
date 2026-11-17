
const ToolsLayout = () => {
  const dummyActions = ['lClick', 'rClick', 'doubleClick', 'typeText', 'scroll', 'wait'];
  return (
    <div className="toolsLayout">
      <h3 className="toolsTitle">Tools</h3>
      <ul className="toolsList">
        {dummyActions.map((action, index) => (
          <li key={index} className="toolsItem btn">{action}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToolsLayout