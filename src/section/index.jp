( function( wp ) {
  const { registerBlockType } = wp.blocks;
  const { useBlockProps, RichText, InspectorControls } = wp.blockEditor;
  const { PanelBody, ColorPalette } = wp.components;

  registerBlockType('swipe-lp/section', {
    edit({ attributes, setAttributes }) {
      const { title, content, bgColor } = attributes;
      const blockProps = useBlockProps({ className: 'swiper-slide', style: { backgroundColor: bgColor } });

      return (
        <>
          <InspectorControls>
            <PanelBody title="背景色">
              <ColorPalette value={bgColor} onChange={(c)=>setAttributes({ bgColor: c })} />
            </PanelBody>
          </InspectorControls>
          <section {...blockProps}>
            <RichText tagName="h2" value={title} onChange={(v)=>setAttributes({ title: v })} placeholder="セクションタイトル"/>
            <RichText tagName="p" value={content} onChange={(v)=>setAttributes({ content: v })} placeholder="本文"/>
          </section>
        </>
      );
    },
    save({ attributes }) {
      const { title, content, bgColor } = attributes;
      const blockProps = wp.blockEditor.useBlockProps.save({ className: 'swiper-slide', style: { backgroundColor: bgColor } });
      return (
        <section {...blockProps}>
          <RichText.Content tagName="h2" value={title} />
          <RichText.Content tagName="p" value={content} />
        </section>
      );
    },
  });
} )( window.wp );
