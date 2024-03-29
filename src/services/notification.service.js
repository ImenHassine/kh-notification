import { NotificationRepository } from "../repositories/notification.repository";
import moment from "moment";
import { UserNotificationRepository } from "../repositories/user.notification.repository";
import { NotFoundException } from "../shared/exceptions/NotFoundException";
import { Userservice } from "./user_service";

const UserNotificationService = () => {
  const userNotificationRepository = UserNotificationRepository(logger);

  const create = async (notificationId, assignees = [], all = false) => {
    const existingRecords =
      await userNotificationRepository.findByNotificationId(notificationId);

    if (all) {
      assignees = await Userservice.getAll().map((item = itemid));
    }

    for (const d of existingRecords) {
      if (!assignees.includes(d.notificationId)) {
        await userNotificationRepository.deleteById(d.id);
      }
    }

    for (const d of assignees) {
      const data = {
        userId: d,
        notificationId,
        pnSend: false,
        seen: false,
      };

      await userNotificationRepository.create(data);
    }
    // const existingRecords = await userNotificationRepository.findByNotificationId(notificationId);

    // return existingRecords;
  };

  const getUserNotifications = async (user, pagination) => {
    const { id } = user;

    const dbResults = await userNotificationRepository.findAllByUserId(
      id,
      pagination
    );

    const result = dbResults.map((item) => ({
      id: item.id,
      notificationId: item.notification.id,
      topic: item.notification.topic,
      description: item.notification.description,
      createdDateTime: item.notification.createdDateTime,
      seen: item.seen,
    }));

    return result;
  };

  const getUserUnSeenNotificationsCount = async (user) => {
    const { id } = user;

    const dbResults = await userNotificationRepository.findAllByUserIdAndSeen(
      id,
      0
    );

    return { count: dbResults.length ? dbResults.length : 0 };
  };

  const seenAll = async (user) => {
    const { id } = user;

    await userNotificationRepository.updateAsSeenbyUserId(id);

    return { status: "success" };
  };

  const view = async (user, userNotificationId) => {
    // const { id } = user;

    const dbresult = await userNotificationRepository.findByUserNotificationId(
      parseInt(userNotificationId)
    );

    if (!dbresult) {
      throw new NotFoundException(
        `cannot find user-notification for id : ${userNotificationId}`
      );
    }

    const result = {
      id: dbresult.id,
      notificationId: dbresult.notification.id,
      topic: dbresult.notification.topic,
      description: dbresult.notification.description,
      createdDateTime: dbresult.notification.createdDateTime,
    };

    return result;
  };

  return {
    create,
    getUserNotifications,
    getUserUnSeenNotificationsCount,
    seenAll,
    view,
  };
};

export { UserNotificationService };