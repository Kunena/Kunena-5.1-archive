/**
 * Kunena Component
 * @package Kunena.Template.Crypsis
 *
 * @copyright     Copyright (C) 2008 - 2020 Kunena Team. All rights reserved.
 * @license https://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link https://www.kunena.org
 **/

jQuery(document).ready(function ($) {

	/* To hide or open spoiler on click */
	$('.kspoiler').each(function (index) {
		$(function() {
			$(document).on('click', '.kspoiler-expand', function (e) {
				var show = $(this.children[0]).val() === Joomla.getOptions('com_kunena.expand');
				$(this.children[0]).val(show ? Joomla.getOptions('com_kunena.hide') : Joomla.getOptions('com_kunena.expand'));
				e.preventDefault()
				$(this).parent().children('.kspoiler-wrapper').toggle()
			});
		});
	});

	/* To allow to close or open the quick-reply modal box */
	$('.openmodal').click(function () {
		var boxToOpen = $(this).attr('href');
		$(boxToOpen).css('visibility', 'visible');
	});

	/* Button to show more info on profilebox */
	$(".heading").click(function () {
		if (!$(this).hasClass('heading-less')) {
			$(this).prev(".heading").show();
			$(this).hide();
			$(this).next(".content").slideToggle(500);
		}
		else {
			var content = $(this).next(".heading").show();
			$(this).hide();
			content.next(".content").slideToggle(500);
		}
	});

	$('[id^="login-link"]').click(function () {
		$(this).ready(function () {
			if ($('#userdropdown').is(":visible")) {
				$(this).addClass('kdelay');
			}
			else {
				$('#userdropdown').css('display', 'inline-block');
				$('#userdropdown').css('visibility', 'visible').delay(500).queue(function () {
					$(this).addClass('kdelay');
				});
			}
		});
	});

	$(document).click(function () {
		$('.kdelay').css('display', 'none').removeClass('kdelay');
	});

	$('#userdropdown').click(function (e) {
		e.stopPropagation();
	});

	/* On moderate page display subject or field to enter manually the topic ID */
	$('#kmod_topics').change(function () {
		var id_item_selected = $(this).val();
		if (id_item_selected == 0) {
			$('#kmod_subject').hide();
		}
		else {
			$('#kmod_subject').show();
		}

		if (id_item_selected == -1) {
			$('#kmod_targetid').show();
		}
		else {
			$('#kmod_targetid').hide();
		}
	});

	if ($.fn.jsSocials !== undefined) {
		$("#share").jsSocials({
			showCount: true,
			showLabel: true,
			shares: [
				{
					share: "email",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_EMAIL_LABEL')
				},
				{
					share: "twitter",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_TWITTER_LABEL')
				},
				{
					share: "facebook",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_FACEBOOK_LABEL')
				},
				{
					share: "linkedin",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_LINKEDIN_LABEL')
				}, {
					share: "pinterest",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_PINTEREST_LABEL')
				},
				{
					share: "stumbleupon",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_STUMBLEUPON_LABEL')
				},
				{
					share: "whatsapp",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_WHATSAPP_LABEL')
				}]
		});
		$('.jssocials-share-whatsapp').addClass('visible-xs-block');
	}

	$('#kmod_categories').change(function () {
		$.getJSON(
			kunena_url_ajax, {catid: $(this).val()}
		).done(function (json) {
			var first_item = $('#kmod_topics option:nth-child(0)').clone();
			var second_item = $('#kmod_topics option:nth-child(1)').clone();

			$('#kmod_topics').empty();
			first_item.appendTo('#kmod_topics');
			second_item.appendTo('#kmod_topics');

			$.each(json, function (index, object) {
				$.each(object, function (key, element) {
					$('#kmod_topics').append('<option value="' + element['id'] + '">' + element['subject'] + '</option>');
				});
			});
		})
			.fail(function () {
				//TODO: handle the error of ajax request
			});
	});
});
