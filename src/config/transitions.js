export const TRANSITIONS = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '300ms',
    SLOW: '500ms'
  },
  TIMING: {
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    LINEAR: 'linear'
  },
  PROPERTIES: {
    ALL: 'all',
    OPACITY: 'opacity',
    TRANSFORM: 'transform',
    COLOR: 'color',
    BACKGROUND: 'background',
    BORDER: 'border',
    BOX_SHADOW: 'box-shadow'
  }
}

export const ANIMATIONS = {
  FADE: {
    IN: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    OUT: {
      from: { opacity: 1 },
      to: { opacity: 0 }
    }
  },
  SLIDE: {
    UP: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' }
    },
    DOWN: {
      from: { transform: 'translateY(-100%)' },
      to: { transform: 'translateY(0)' }
    },
    LEFT: {
      from: { transform: 'translateX(100%)' },
      to: { transform: 'translateX(0)' }
    },
    RIGHT: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' }
    }
  },
  SCALE: {
    IN: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 }
    },
    OUT: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.95)', opacity: 0 }
    }
  }
} 