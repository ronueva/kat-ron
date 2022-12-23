<?php

namespace Drupal\katron\Plugin\rest\resource;

use Drupal\Component\Plugin\DependentPluginInterface;
use Drupal\Core\Database\Connection;
use Drupal\Core\Routing\BcRoute;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Represents Invitation records as resources.
 *
 * @RestResource (
 *   id = "katron_invitation",
 *   label = @Translation("Invitation"),
 *   uri_paths = {
 *     "create" = "/api/katron-invitation"
 *   }
 * )
 *
 * @DCG
 * This plugin exposes database records as REST resources. In order to enable it
 * import the resource configuration into active configuration storage. You may
 * find an example of such configuration in the following file:
 * core/modules/rest/config/optional/rest.resource.entity.node.yml.
 * Alternatively you can make use of REST UI module.
 * @see https://www.drupal.org/project/restui
 * For accessing Drupal entities through REST interface use
 * \Drupal\rest\Plugin\rest\resource\EntityResource plugin.
 */
class InvitationResource extends ResourceBase {

  /**
   * Responds to POST requests and saves the new record.
   *
   * @param mixed $data
   *   Data to write into the database.
   *
   * @return \Drupal\rest\ModifiedResourceResponse
   *   The HTTP response object.
   */
  public function post($data) {

    $saved = false;

    $invitees = $data["invitees"];

    if ($data["group"]) {
      $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($data["group"]);

      $term->set("field_status", FALSE);

      $term->save();
    }

    foreach ($invitees as $invitee) {

      $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($invitee["id"]);

      $term->set("field_present", $invitee["response"]);

      $saved = $term->save();

    }

    // Return the newly created record in the response body.
    return new ModifiedResourceResponse(['result' => (bool) $saved], 200);
  }

}
