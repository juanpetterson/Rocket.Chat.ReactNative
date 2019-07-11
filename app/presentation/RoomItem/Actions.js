import React from 'react';
import { Animated, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import I18n from '../../i18n';
import styles, { ACTION_WIDTH, LONG_SWIPE } from './styles';
import { CustomIcon } from '../../lib/Icons';

export const LeftActions = React.memo(({
	rowTranslation, isRead, width, onToggleReadPress
}) => {
	const translateX = rowTranslation.interpolate({
		inputRange: [0, ACTION_WIDTH],
		outputRange: [-ACTION_WIDTH, 0]
	});
	const translateXIcon = rowTranslation.interpolate({
		inputRange: [0, ACTION_WIDTH, LONG_SWIPE - 2, LONG_SWIPE],
		outputRange: [0, 0, -LONG_SWIPE + ACTION_WIDTH + 2, 0],
		extrapolate: 'clamp'
	});
	return (
		<View
			style={styles.actionsContainer}
			pointerEvents='box-none'
		>
			<Animated.View
				style={[
					styles.actionLeftButtonContainer,
					{
						right: width - ACTION_WIDTH,
						width,
						transform: [{ translateX }]
					}
				]}
			>
				<Animated.View
					style={[
						styles.actionLeftButtonContainer,
						{
							right: 0,
							transform: [{ translateX: translateXIcon }]
						}
					]}
				>
					<RectButton style={styles.actionButton} onPress={onToggleReadPress}>
						<React.Fragment>
							<CustomIcon size={20} name={isRead ? 'flag' : 'check'} color='white' />
							<Text style={styles.actionText}>{I18n.t(isRead ? 'Unread' : 'Read')}</Text>
						</React.Fragment>
					</RectButton>
				</Animated.View>
			</Animated.View>
		</View>
	);
});

export const RightActions = React.memo(({
	rowTranslation, favorite, width, toggleFav, onHidePress
}) => {
	const translateXFav = rowTranslation.interpolate({
		inputRange: [-width / 2, -ACTION_WIDTH * 2, 0],
		outputRange: [width / 2, width - ACTION_WIDTH * 2, width]
	});
	const translateXHide = rowTranslation.interpolate({
		inputRange: [-width, -LONG_SWIPE, -ACTION_WIDTH * 2, 0],
		outputRange: [0, width - LONG_SWIPE, width - ACTION_WIDTH, width]
	});
	return (
		<View
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				height: 75,
				flexDirection: 'row'
			}}
			pointerEvents='box-none'
		>
			<Animated.View
				style={[
					styles.actionRightButtonContainer,
					{
						width,
						transform: [{ translateX: translateXFav }]
					}
				]}
			>
				<RectButton style={[styles.actionButton, { backgroundColor: '#ffbb00' }]} onPress={toggleFav}>
					<React.Fragment>
						<CustomIcon size={20} name={favorite ? 'Star-filled' : 'star'} color='white' />
						<Text style={styles.actionText}>{I18n.t(favorite ? 'Unfavorite' : 'Favorite')}</Text>
					</React.Fragment>
				</RectButton>
			</Animated.View>
			<Animated.View
				style={[
					styles.actionRightButtonContainer,
					{
						width,
						transform: [{ translateX: translateXHide }]
					}
				]}
			>
				<RectButton style={[styles.actionButton, { backgroundColor: '#54585e' }]} onPress={onHidePress}>
					<React.Fragment>
						<CustomIcon size={20} name='eye-off' color='white' />
						<Text style={styles.actionText}>{I18n.t('Hide')}</Text>
					</React.Fragment>
				</RectButton>
			</Animated.View>
		</View>
	);
});

LeftActions.propTypes = {
	rowTranslation: PropTypes.object,
	isRead: PropTypes.bool,
	width: PropTypes.number,
	onToggleReadPress: PropTypes.func
};

RightActions.propTypes = {
	rowTranslation: PropTypes.object,
	favorite: PropTypes.bool,
	width: PropTypes.number,
	toggleFav: PropTypes.func,
	onHidePress: PropTypes.func
};
