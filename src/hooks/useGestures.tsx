import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import { useCapacitor } from './useCapacitor';
import { ImpactStyle } from '@capacitor/haptics';

interface UseGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPullToRefresh?: () => void;
  hapticFeedback?: boolean;
  swipeThreshold?: number;
}

export const useGestures = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPullToRefresh,
  hapticFeedback = true,
  swipeThreshold = 100,
}: UseGesturesOptions = {}): SwipeableHandlers => {
  const { triggerHaptic } = useCapacitor();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (onSwipeLeft) {
        if (hapticFeedback) triggerHaptic(ImpactStyle.Light);
        onSwipeLeft();
      }
    },
    onSwipedRight: () => {
      if (onSwipeRight) {
        if (hapticFeedback) triggerHaptic(ImpactStyle.Light);
        onSwipeRight();
      }
    },
    onSwipedUp: () => {
      if (onSwipeUp) {
        if (hapticFeedback) triggerHaptic(ImpactStyle.Light);
        onSwipeUp();
      }
    },
    onSwipedDown: (eventData) => {
      if (onSwipeDown) {
        if (hapticFeedback) triggerHaptic(ImpactStyle.Light);
        onSwipeDown();
      }
      
      // Pull to refresh logic
      if (onPullToRefresh && eventData.initial[1] < 100) {
        if (hapticFeedback) triggerHaptic(ImpactStyle.Medium);
        onPullToRefresh();
      }
    },
    delta: swipeThreshold,
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
  });

  return handlers;
};