( function( wp ) {
  const { registerBlockType } = wp.blocks;
  const { useBlockProps, InnerBlocks, InspectorControls } = wp.blockEditor;
  const { PanelBody, ToggleControl, SelectControl } = wp.components;

  const TEMPLATE = [
    ['swipe-lp/section', { title: 'Hero', content: 'キャッチコピーを入力', bgColor: '#f0f0f0' }],
    ['swipe-lp/section', { title: 'Benefit', content: 'メリットを入力', bgColor: '#ffffff' }],
    ['swipe-lp/section', { title: 'CTA', content: 'お申し込みはこちら', bgColor: '#eeeeee' }],
  ];

  registerBlockType('swipe-lp/container', {
    edit({ attributes, setAttributes }) {
      const { direction = 'vertical', mobileOnly = true } = attributes;
      const props = useBlockProps({ className: 'swiper swipe-lp' });

      return (
        wp.element.createElement(wp.element.Fragment, null, [
          wp.element.createElement(InspectorControls, null,
            wp.element.createElement(PanelBody, { title: '動作設定' }, [
              wp.element.createElement(SelectControl, {
                label: '方向',
                value: direction,
                options: [
                  { label: '縦（上下スワイプ）', value: 'vertical' },
                  { label: '横（左右スワイプ）', value: 'horizontal' },
                ],
                onChange: (v) => setAttributes({ direction: v })
              }),
              wp.element.createElement(ToggleControl, {
                label: 'モバイルのみスワイプ（PCは通常スクロール）',
                checked: mobileOnly,
                onChange: (v) => setAttributes({ mobileOnly: v })
              })
            ])
          ),
          wp.element.createElement('div', props, [
            wp.element.createElement('p', { style: {textAlign:'center',fontStyle:'italic'}}, '初期テンプレ（Hero／Benefit／CTA）が入ります'),
            wp.element.createElement(InnerBlocks, { allowedBlocks: ['swipe-lp/section'], template: TEMPLATE, templateLock: false })
          ])
        ])
      );
    },
    save({ attributes }) {
      const { direction = 'vertical', mobileOnly = true } = attributes;
      const props = wp.blockEditor.useBlockProps.save({
        className: 'swiper swipe-lp',
        'data-direction': direction,
        'data-mobile-only': String(mobileOnly)
      });
      return (
        wp.element.createElement('div', props, [
          wp.element.createElement('div', { className: 'swiper-wrapper' }, wp.element.createElement(InnerBlocks.Content)),
          wp.element.createElement('div', { className: 'swiper-pagination' })
        ])
      );
    },
  });
} )( window.wp );
