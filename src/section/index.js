( function( wp ) {
  const { registerBlockType } = wp.blocks;
  const { useBlockProps, RichText, InspectorControls } = wp.blockEditor;
  const { PanelBody, ColorPalette } = wp.components;

  registerBlockType('swipe-lp/section', {
    edit({ attributes, setAttributes }) {
      const { title, content, bgColor } = attributes;
      const blockProps = useBlockProps({ className: 'swiper-slide', style: { backgroundColor: bgColor } });

      return (
        wp.element.createElement(wp.element.Fragment, null, [
          wp.element.createElement(InspectorControls, null,
            wp.element.createElement(PanelBody, { title: '背景色' },
              wp.element.createElement(ColorPalette, {
                value: bgColor,
                onChange: (c) => setAttributes({ bgColor: c })
              })
            )
          ),
          wp.element.createElement('section', blockProps, [
            wp.element.createElement(RichText, {
              tagName: 'h2',
              value: title,
              onChange: (v) => setAttributes({ title: v }),
              placeholder: 'セクションタイトル'
            }),
            wp.element.createElement(RichText, {
              tagName: 'p',
              value: content,
              onChange: (v) => setAttributes({ content: v }),
              placeholder: '本文'
            })
          ])
        ])
      );
    },
    save({ attributes }) {
      const { title, content, bgColor } = attributes;
      const blockProps = wp.blockEditor.useBlockProps.save({ className: 'swiper-slide', style: { backgroundColor: bgColor } });
      return (
        wp.element.createElement('section', blockProps, [
          wp.element.createElement(RichText.Content, { tagName: 'h2', value: title }),
          wp.element.createElement(RichText.Content, { tagName: 'p', value: content })
        ])
      );
    },
  });
} )( window.wp );
