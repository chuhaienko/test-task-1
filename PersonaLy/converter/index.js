'use strict';

const BaseConverter = require('../../../../../common/base_converter/index');
const _             = require('lodash');


class PersonaLy extends BaseConverter {
	constructor () {
		super();
	}

	getRawPageEntities (campaigns) {
		return campaigns || [];
	}

	getCampaignsCount (campaigns) {
		return this.getRawPageEntities(campaigns).length;
	}

	getCampaignName (campaign) {
		return campaign.campaign_name || '';
	}

	getCampaignOffersCount () {
		return 1;
	}

	getOfferExternalId (campaign) {
		return campaign.id;
	}

	getOfferDescription () {
		return '';
	}

	getOfferIncentAllowed (campaign) {
		return campaign.traffic_restrictions.traffic_incentivized === 'yes';
	}

	getOfferAssignmentsCount () {
		return 1;
	}

	getOfferRequiredApproval () {
		return false;
	}

	getOfferAssignmentExternalId (campaign, index) {
		return this.getOfferExternalId(campaign, index);
	}

	getOfferAssignmentTargetedCountries (campaign) {
		let countries = [];

		campaign.payouts.forEach((it) => {
			countries.concat(it.countries);
		});

		countries = Array.from(new Set(countries));

		return countries;
	}

	getOfferAssignmentTargetedDeviceTypes () {
		return ['Mobile', 'Tablet'];
	}

	getOfferAssignmentTargetedOs (campaign) {
		let os = [];

		if (campaign.ios_min_version) {
			os.push('IOS');
		}

		if (campaign.android_min_version) {
			os.push('ANDROID');
		}

		return os;
	}

	getOfferTargetedMinOsVersion (campaign) {
		return campaign.ios_min_version || campaign.android_min_version || '';
	}

	getOfferAssignmentRedirectUrl (campaign) {
		return campaign.tracking_url || '';
	}

	getOfferProductsCount () {
		return 1;
	}

	getOfferCurrency () {
		return {
			currency: 'USD'
		};
	}

	getOfferAssignmentPayoutAmount (campaign, index) {
		return campaign.payouts[index].usd_payout || 0;
	}

	getOfferPaymentModel (campaign) {
		return campaign.conversion_mode;
	}

	getOfferAssignmentTargetedConnectionTypes (campaign) {
		if (campaign.traffic_restrictions.only_wifi === 'yes') {
			return ['WIFI'];
		} else if (campaign.traffic_restrictions.only_3g === 'yes') {
			return ['2G/3G/4G'];
		} else {
			return ['WIFI', '2G/3G/4G'];
		}
	}

	getOfferProductInfo (campaign) {
		let productInfo = {
			productType : 'Mobile Web',
			productId   : '',
			previewUrl  : '',
			platform    : ''
		};

		if (campaign.ios_min_version) {
			productInfo.productId  = campaign.store_app_id;
			productInfo.previewUrl = campaign.preview_url_ios;
			productInfo.platform   = 'ios';
		} else if (campaign.android_min_version) {
			productInfo.productId  = campaign.android_package_id;
			productInfo.previewUrl = campaign.preview_url_android;
			productInfo.platform   = 'android';
		} else if (campaign.windows_phone_min_version) {
			productInfo.platform   = 'wp';
		}

		return productInfo;
	}

	getMessageCreatives () {
		return {
			creatives: []
		};
	}

	getOfferCreativePackageName () {
		return '';
	}

	getOfferCreativePackageRedirectUrl (campaign, offerIndex) {
		return this.getOfferAssignmentRedirectUrl(campaign, offerIndex);
	}

	getOfferCreativePackageExternalId (campaign, offerIndex) {
		return this.getOfferExternalId(campaign, offerIndex);
	}

	getOfferCreativePackageCtaText () {
		return '';
	}

	getOfferCreativePackageTitle () {
		return '';
	}

	getOfferCreativePackageDescription () {
		return '';
	}

	getOfferCreativePackageCount (campaign) {
		return campaign.creatives.length;
	}

	getOfferCreativeCount (campaign, offerIndex, packageIndex) {
		return campaign.creatives[packageIndex].length;
	}

	getOfferCreativeAssetUrl (campaign, offerIndex, packageIndex, creativeIndex) {
		return (campaign.creatives[packageIndex][creativeIndex] || {}).creative_url || '';
	}

	getOfferCreativeType (campaign, offerIndex, packageIndex, creativeIndex) {
		return (campaign.creatives[packageIndex][creativeIndex] || {}).creative_type || '';
	}

	getOfferCreativeName () {
		return '';
	}

	getOfferCreativeMime () {
		return undefined;
	}

	getOfferCreativeExternalId (campaign) {
		return this.getOfferExternalId(campaign);
	}

	getOfferCreativeByteSize () {
		return undefined;
	}

	getOfferCreativeWidth (campaign, offerIndex, packageIndex, creativeIndex) {
		return _.get(campaign.creatives, [packageIndex, creativeIndex, 'creative_dimensions', 'width']);
	}

	getOfferCreativeHeight (campaign, offerIndex, packageIndex, creativeIndex) {
		return _.get(campaign.creatives, [packageIndex, creativeIndex, 'creative_dimensions', 'height']);
	}
}

module.exports = new PersonaLy();
