import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import {AppDataSource} from "../../src/data/data-source"
import {join} from "path";
describe('API Endpoints', () => {
  let userID: number;
  let projectID: number;
  let taskID: number;
  let commentID: number;
  let attachmentID: number;
  let newUserID: number;
  let app: any;

  beforeAll(async () => {
    await AppDataSource.initialize();
    app = await createApp<Framework>();

    const userResult = await createHttpRequest(app)
      .post('/api/register')
      .send({username: 'testuser', password: 'testpassword', email: 'testemail@example.com'});
    console.log('User registration result:', userResult.body)
    userID = userResult.body.data.id;


    const projectResult = await createHttpRequest(app)
      .post('/api/createProject')
      .send({name: 'New Project', userID});
    projectID = projectResult.body.data.id;

    const taskResult = await createHttpRequest(app)
      .post('/api/createTask')
      .send({title: 'New Task', projectID});
    taskID = taskResult.body.data.id;

    const commentResult = await createHttpRequest(app)
      .post('/api/addComment')
      .send({taskID, userID, content: 'This is a test comment'});
    commentID = commentResult.body.data.id;
  });

  test('POST /api/register should return success when user is registered', async () => {
    const result = await createHttpRequest(app)
      .post('/api/register')
      .send({username: 'newuser', password: 'newpassword', email: 'newuser@example.com'});
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('注册成功');
    newUserID = result.body.data.id;
  });

  test('POST /api/login should return success when credentials are correct', async () => {
    const result = await createHttpRequest(app)
      .post('/api/login')
      .send({username: 'testuser', password: 'testpassword'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('登录成功');
  });

  test('POST /api/modifier should return success when user info is modified', async () => {
    const result = await createHttpRequest(app)
      .post('/api/modifier')
      .send({username: 'testuser', password: 'updatedpassword', email: 'testemail@example.com'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('修改成功');
  });

  test('POST /api/login should return success when credentials are correct', async () => {
    const result = await createHttpRequest(app)
      .post('/api/login')
      .send({username: 'testuser', password: 'updatedpassword'});
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('登录成功');
  });

  test('GET /api/projects should return projects for the user', async () => {
    const result = await createHttpRequest(app)
      .get('/api/projects')
      .query({userID});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  test('POST /api/modifyProjectName should return success when project name is modified', async () => {
    const result = await createHttpRequest(app)
      .post('/api/modifyProjectName')
      .send({projectID, newName: 'Updated Project Name'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('修改成功');
  });

  test('POST /api/updateTaskDescription should return success when task description is updated', async () => {
    const result = await createHttpRequest(app)
      .post('/api/updateTaskDescription')
      .send({id: taskID, description: 'Updated Task Description'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('修改成功');
  });

  test('POST /api/updateTaskTitle should return success when task title is updated', async () => {
    const result = await createHttpRequest(app)
      .post('/api/updateTaskTitle')
      .send({id: taskID, title: 'Updated Task Title'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('修改成功');
  });

  test('POST /api/addComment should return success when comment is added', async () => {
    const result = await createHttpRequest(app)
      .post('/api/addComment')
      .send({taskID, userID, content: 'This is another test comment'});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('评论成功');
  });

  test('POST /api/deleteComment should return success when comment is deleted', async () => {
    const result = await createHttpRequest(app)
      .post('/api/deleteComment')
      .query({id: commentID});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('删除成功');
  });

  test('POST /api/upload should return success when file is uploaded', async () => {
    const filePath = join(__dirname, "../test.txt");
    const result = await createHttpRequest(app)
      .post('/api/upload')
      .attach('file', filePath)
      .field('taskID', taskID);
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    attachmentID = result.body.files[0].id;
  });

  test('GET /api/download should return file', async () => {
    const result = await createHttpRequest(app)
      .get('/api/download')
      .query({filename: 'test.txt'});

    expect(result.status).toBe(200);
    expect(result.headers['content-disposition']).toContain('attachment; filename="test.txt"');
  });

  test('POST /api/deleteAttachment should return success when attachment is deleted', async () => {
    const result = await createHttpRequest(app)
      .post('/api/deleteAttachment')
      .query({id: attachmentID});

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('删除成功');
  });

  afterAll(async () => {
    await createHttpRequest(app).post('/api/deleteComment').query({id: commentID});
    await createHttpRequest(app).post('/api/deleteTask').query({id: taskID});
    await createHttpRequest(app).post('/api/deleteProject').query({id: projectID});
    await createHttpRequest(app).post('/api/deleteUser').query({id: userID});
    await createHttpRequest(app).post('/api/deleteUser').query({id: newUserID});
    // Close app
    await close(app);
  });
});
